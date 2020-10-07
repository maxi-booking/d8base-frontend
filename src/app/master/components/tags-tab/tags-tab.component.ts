import {Component} from '@angular/core';

@Component({
    selector: 'app-tags-tab',
    templateUrl: './tags-tab.component.html',
    styleUrls: ['./tags-tab.component.scss'],
})
export class TagsTabComponent { // implements OnInit {

    // public masterId: number;
    // public form: FormGroup;
    // private defaultTags: Tag[];
    //
    // constructor(
    //     private route: ActivatedRoute,
    //     private formBuilder: FormBuilder,
    //     private api: TagsApiService
    // ) {
    // }
    //
    // public ngOnInit(): void {
    //     this.masterId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    //     this.form = this.formBuilder.group({
    //         tags: ['']
    //     });
    //     this.api.getByMasterId(this.masterId).subscribe(
    //         (list: ApiListResponseInterface<Tag>) => this.defaultTags = list.results
    //     );
    // }
    //
    // public submitForm(): void {
    //
    //     const defaultArr: string[] = this.getTagNamesArray(this.defaultTags);
    //     const selected: string[] = this.form.get('tags').value;
    //
    //     forkJoin([
    //         this.api.deleteList(defaultArr.filter(x => !selected.includes(x)).map((val: string) => this.getDefaultTagByName(val))),
    //         this.api.createList(selected.filter(x => !defaultArr.includes(x)).map((val: string) => this.getNewTag(val)))
    //     ]).subscribe(
    //         res => console.log('updated')
    //     );
    // }
    //
    // private getNewTag(tagName: string): Tag {
    //     const newTag = new Tag();
    //     newTag.name = tagName;
    //     newTag.professional = this.masterId;
    //
    //     return newTag;
    // }
    //
    // private getDefaultTagByName(name: string): Tag {
    //     for (const tag of this.defaultTags) {
    //         if (name === tag.name) {
    //             return tag;
    //         }
    //     }
    //
    //     throw Error('unknown tag name');
    // }
    //
    // private getTagNamesArray(tags: Tag[]): string[] {
    //     const arr: string[] = [];
    //     tags.forEach(tag => arr.push(tag.name));
    //
    //     return arr;
    // }
}
