import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { ServiceWizardPath } from '@app/service-wizard/const/service-wizard-path.const';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { filter, first, map, shareReplay } from 'rxjs/operators';
import { ServiceIds } from '../enums/service-ids.enum';
import { ServiceStepContext } from '../interfaces/step-context.interface';
import { StepModel } from '../interfaces/step-model.interface';
import { StepsModel } from '../interfaces/steps-model.interface';
import { ServiceStepsState } from '../interfaces/steps-state.type';
import { initState, serviceWizardStorageKey, SERVICE_STEPS } from '../service-wizard-steps';

@Injectable()
export class ServiceWizardStateService {
  private steps: StepsModel = SERVICE_STEPS;

  private readonly currentStepId$ = new BehaviorSubject<ServiceIds>(this.steps.ids[0]);
  private readonly state$ = new BehaviorSubject<ServiceStepsState>(null);
  private readonly context$ = new BehaviorSubject<ServiceStepContext>(null);
  private readonly reset$ = new Subject<void>();
  private readonly submit$ = new Subject<ServiceStepsState>();
  private readonly isStateEmpty$: Observable<boolean> = this.state$.pipe(
    map(state => !state || JSON.stringify(initState) === JSON.stringify(state)),
  );
  private path: string;
  private storageKey: string;
  private readonly filteredContext$: Observable<ServiceStepContext>;

  constructor(private readonly router: Router, private readonly storage: StorageManagerService) {
    this.filteredContext$ = this.context$.asObservable().pipe(
      filter(context => Boolean(context)),
      shareReplay(1),
    );
  }

  public submit(): Observable<ServiceStepsState> {
    return this.submit$.asObservable();
  }

  public doSubmit(): void {
    this.submit$.next(this.state$.value);
  }

  public getCurrentStep(): Observable<StepModel> {
    return this.currentStepId$.pipe(map(id => this.steps.byId[id]));
  }

  public setCurrentStep(id: ServiceIds): void {
    return this.currentStepId$.next(id);
  }

  public getState(): Observable<ServiceStepsState> {
    return this.state$.asObservable();
  }

  public getStepStateById(id: ServiceIds): Observable<any> {
    return this.getState().pipe(
      filter(state => Boolean(state)),
      map(state => state[id]),
    );
  }

  public getCurrentStepState(): Observable<any> {
    return this.getStepStateById(this.getIdOfCurrentStep());
  }

  public setCurrentStepState(data: any): void {
    this.setStepStateById(this.getIdOfCurrentStep(), data);
  }

  public nextStep(): void {
    this.isLastStep()
      .pipe(first(isLastStep => !isLastStep))
      .subscribe(() => this.goToStep(+1));
  }

  public prevStep(): void {
    this.isFirstStep()
      .pipe(first(isFirstStep => !isFirstStep))
      .subscribe(() => this.goToStep(-1));
  }

  public isLastStep(): Observable<boolean> {
    return this.currentStepId$.asObservable().pipe(
      map(id => this.steps.ids.lastIndexOf(id) === this.steps.ids.length - 1),
      first(),
    );
  }

  public isFirstStep(): Observable<boolean> {
    return this.currentStepId$.pipe(map(id => this.steps.ids.indexOf(id) === 0));
  }

  public async setContext(context: ServiceStepContext): Promise<void> {
    this.storageKey = `${serviceWizardStorageKey}`;
    this.path = `${ServiceWizardPath}`;
    this.context$.next(context);

    const storedState: ServiceStepsState = await this.storage.get(this.storageKey);
    const state = {
      ...(storedState ?? initState),
      [ServiceIds.Category]: storedState?.[ServiceIds.Category] ?? context?.[ServiceIds.Category],
    };

    this.steps = this.getSteps({ context, state });
    this.state$.next(state ?? initState);
  }

  public getContext(): Observable<ServiceStepContext> {
    return this.filteredContext$;
  }

  public isStateEmpty(): Observable<boolean> {
    return this.isStateEmpty$;
  }

  public getFirstStep(): Observable<StepModel> {
    const { byId, ids } = this.steps;

    return of(byId[ids[0]]);
  }

  public reset(): void {
    this.clearState();
    this.context$.next(null);
    this.currentStepId$.next(this.steps.ids[0]);
    this.state$.next(null);
    this.path = null;
    this.reset$.next();
  }

  public isReset(): Observable<void> {
    return this.reset$.asObservable();
  }

  public async setStepStateById(id: ServiceIds, data: any = initState[id]): Promise<void> {
    const newState: ServiceStepsState = {
      ...this.state$.value,
      [id]: data,
      [ServiceIds.Summary]: { ...this.state$.value[ServiceIds.Summary], [id]: data },
    };
    this.state$.next(newState);
    await this.storage.set(this.storageKey, newState);
  }

  private goToStep(offset: number): void {
    this.currentStepId$.pipe(first()).subscribe(currentStepId => {
      const index = this.steps.ids.indexOf(currentStepId);
      const nextStepId = this.steps.ids[index + offset];
      this.currentStepId$.next(nextStepId);
      this.router.navigate([this.path, nextStepId]);
    });
  }

  private clearState(): void {
    this.storage.remove(this.storageKey);
  }

  private getIdOfCurrentStep(): ServiceIds {
    return this.currentStepId$.value;
  }

  private getSteps({ context: ServiceStepContext, state: ServiceStepsState }): StepsModel {
    return SERVICE_STEPS;
  }
}
