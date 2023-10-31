import { Component, Input } from '@angular/core';
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
  public Editor = ClassicEditor;
}
