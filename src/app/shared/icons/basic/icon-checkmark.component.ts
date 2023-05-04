import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-checkmark',
  template: `<svg 
                class="checkmark" width="24" height="24" viewBox="0 0 24 24">
                <path fill="green" d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14ZM5 5v14V5Z" />
				      </svg>`,
  styleUrls: ['../icon.styles.scss']
 })
export class IconCheckmarkComponent {

}
