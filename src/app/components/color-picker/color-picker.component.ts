import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from 'src/app/services/noteServices/note.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  @Input() note: any;

  @Output() colorEvent = new EventEmitter();

  constructor(private noteServices: NoteService) { }

  ngOnInit() {
  }

  /**
   * @description updates mat card color of selected notes
   * @param color color value
   * @param note note, which has to be colored
   */
  updateBackgroundColor(color) {
    if (this.note) {
      let data = { noteIdList: [this.note.id], color: color };
      this.noteServices.updateBackgroundColor(data).subscribe((response) => {
        this.colorEvent.emit(null);
      });
    }
    else
      this.colorEvent.emit(color);
  }

}
