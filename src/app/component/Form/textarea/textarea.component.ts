import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
})
export class TextareaComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() content: string = '';
  @Input() type: string = '';
  @Input() isAsk: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() isDisabled: boolean = false;
  editorData: string = '';
  console = console;
  @Output() value: EventEmitter<string> = new EventEmitter<string>();
  public Editor = ClassicEditor;
  setVal(value: any) {
    this.value.emit(value.target.value);
  }
  setValEditor({ editor }: ChangeEvent) {
    this.value.emit(editor.data.get());
  }
}
