import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';

import * as ScheduleConstants from '@app/core/constants/schedule.constants';
import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import { WeekDayNumber } from '@app/core/types/schedule-types';
import { Observable } from 'rxjs';
import { ScheduleEditorFormFields } from './schedule-editor-form-fields.enum';

@Injectable()
export class ScheduleEditorFormService {

  public valueChanges: Observable<AbstractSchedule[]>;

  public form: FormGroup;
  public formArray: AbstractSchedule[] = [];
  public toDelete: AbstractSchedule[] = [];

  constructor(private readonly formBuilder: FormBuilder) {
    this.createForm();
    this.valueChanges = this.form.controls.timetable.valueChanges;
  }

  public get controls(): FormGroup[] {
    return (this.form.controls.timetable as FormArray).controls as FormGroup[];
  }

  public isControlValid(control: string, index: number): boolean {
    return this.controls[index].controls[control].valid;
  }

  public updateStartTime(value: string, index: number): void {
    this.formArray[index].start_time = value;
  }

  public updateEndTime(value: string, index: number): void {
    this.formArray[index].end_time = value;
  }

  public isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  public pushDay(dayCode: number, startTime: string = null, endTime: string = null, id: number = null): void {
    (this.form.get(ScheduleEditorFormFields.Timetable) as FormArray).push(
      this.getFormGroup(dayCode, startTime, endTime, id),
    );
  }

  public pushNewDay(dayCode: WeekDayNumber): void {
    this.formArray.push({
      day_of_week: dayCode,
      end_time: null,
      start_time: null,
      is_enabled: true,
    });

    this.updateForm();
  }

  public unsetError(i: number): void {
    const endTimeValue = this.controls[i].controls[ScheduleEditorFormFields.EndTime].value;
    this.controls[i].controls[ScheduleEditorFormFields.EndTime].reset();
    this.controls[i].controls[ScheduleEditorFormFields.EndTime].setValue(endTimeValue);
    const startTimeValue = this.controls[i].controls[ScheduleEditorFormFields.StartTime].value;
    this.controls[i].controls[ScheduleEditorFormFields.StartTime].reset();
    this.controls[i].controls[ScheduleEditorFormFields.StartTime].setValue(startTimeValue);
  }

  public getDayByIndex(i: number): string {
    return ScheduleConstants.defaultWeek[i];
  }

  public deleteDay(index: number): void {
    if (this.formArray[index].id) {
      this.toDelete.push(this.formArray[index]);
    }
    this.formArray.splice(index, 1);
    this.form.markAsDirty();
    this.updateForm();
  }

  public checkOverlapValidity(index: number): any {
    const day = this.formArray[index];
    if (day.start_time && day.end_time) {
      this.formArray.forEach((value, idx) => {
        if ((index !== idx) && (day.day_of_week === value.day_of_week)) {
          if ((value.start_time && value.end_time) &&
            ((this.timeToInt(day.start_time) > this.timeToInt(value.start_time) &&
              this.timeToInt(day.start_time) < this.timeToInt(value.end_time)) ||
              (this.timeToInt(day.end_time) < this.timeToInt(value.end_time) &&
                this.timeToInt(day.end_time) > this.timeToInt(value.start_time)))
          ) {
            this.controls[index].controls[ScheduleEditorFormFields.EndTime].setErrors({ overlaps: true });
            this.controls[index].controls[ScheduleEditorFormFields.StartTime].setErrors({ overlaps: true });
          } else if (
            (this.controls[index].controls[ScheduleEditorFormFields.EndTime].hasError('overlaps') ||
              this.controls[index].controls[ScheduleEditorFormFields.StartTime].hasError('overlaps')) &&
            !this.controls[index].controls[ScheduleEditorFormFields.StartTime].hasError('timeError') &&
            !this.controls[index].controls[ScheduleEditorFormFields.EndTime].hasError('timeError')
          ) {
            this.unsetError(index);
          }
        }
      });
    }
  }

  public fillTimeTable(timetable: AbstractSchedule[]): void {
    this.formArray = timetable;
    this.updateForm();
  }

  private createForm(): void {
    this.formArray = [];
    this.toDelete = [];
    this.form = this.formBuilder.group({
      timetable: this.formBuilder.array([]),
    });
  }

  private timeToInt(time: string): number {
    if (time.length !== 5) {
      throw Error('unexpected time string length');
    }

    return parseInt(time.slice(0, 2) + time.slice(3, 5), 10);
  }

  private updateForm(): void {
    (this.form.get(ScheduleEditorFormFields.Timetable) as FormArray).clear();
    this.sort();
    this.formArray.forEach(data => this.pushDay(data.day_of_week, data.start_time, data.end_time, data.id));
  }

  private sort(): void {
    this.formArray = this.formArray?.sort((a, b) => a.day_of_week > b.day_of_week ? 1 : -1);
  }

  private getFormGroup(
    dayCode: number,
    startTime: string = null,
    endTime: string = null,
    id: number = null,
  ): FormGroup {
    return this.formBuilder.group({
      [ScheduleEditorFormFields.Day]: [dayCode],
      [ScheduleEditorFormFields.StartTime]: [startTime],
      [ScheduleEditorFormFields.EndTime]: [endTime],
      [ScheduleEditorFormFields.Id]: [id],
    }, {
      validators: [
        this.startTimeValidator,
        this.endTimeValidator,
        this.startTimeFormatValidator,
        this.endTimeFormatValidator,
        this.timeIntervalValidator,
      ],
    });
  }

  private timeIntervalValidator(group: FormGroup): ValidationErrors | null {
    const startTime = parseInt(
      (group.get(ScheduleEditorFormFields.StartTime).value as string)?.slice(0, 2) +
      (group.get(ScheduleEditorFormFields.StartTime).value as string)?.slice(3, 5),
      10,
    );
    const endTimeTime = parseInt(
      (group.get(ScheduleEditorFormFields.EndTime).value as string)?.slice(0, 2) +
      (group.get(ScheduleEditorFormFields.EndTime).value as string)?.slice(3, 5),
      10,
    );
    if (startTime >= endTimeTime) {
      group.get(ScheduleEditorFormFields.EndTime).setErrors({ timeError: true });
    }

    return null;
  }

  private startTimeFormatValidator(group: FormGroup): ValidationErrors | null {
    if ((group.get(ScheduleEditorFormFields.StartTime).value as string)?.length !== 5 ||
        parseInt((group.get(ScheduleEditorFormFields.StartTime).value as string)?.slice(0, 1), 10) > 2 ||
        parseInt((group.get(ScheduleEditorFormFields.StartTime).value as string)?.slice(3, 5), 10) % 15 !== 0
    ) {
      group.get(ScheduleEditorFormFields.StartTime).setErrors({ timeError: true });
    }

    return null;
  }

  private endTimeFormatValidator(group: FormGroup): ValidationErrors | null {
    if ((group.get(ScheduleEditorFormFields.EndTime).value as string)?.length !== 5 ||
        parseInt((group.get(ScheduleEditorFormFields.EndTime).value as string)?.slice(0, 1), 10) > 2 ||
        parseInt((group.get(ScheduleEditorFormFields.EndTime).value as string)?.slice(3, 5), 10) % 15 !== 0
    ) {
      group.get(ScheduleEditorFormFields.EndTime).setErrors({ timeError: true });
    }

    return null;
  }

  private startTimeValidator(group: FormGroup): ValidationErrors | null {
    if (!group.get(ScheduleEditorFormFields.StartTime).value) {
      group.get(ScheduleEditorFormFields.StartTime).setErrors({ timeError: true });
    }

    return null;
  }

  private endTimeValidator(group: FormGroup): ValidationErrors | null {
    if (!group.get(ScheduleEditorFormFields.EndTime).value) {
      group.get(ScheduleEditorFormFields.EndTime).setErrors({ timeError: true });
    }

    return null;
  }
}
