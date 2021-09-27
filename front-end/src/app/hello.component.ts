import { Component, Input,OnInit } from '@angular/core';
 import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-hello',
  template: `<button (click)="show()">SHOW</button>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent{

 
 constructor(
        private spinnerService: Ng4LoadingSpinnerService
    ) { }

show()
{
  this.spinnerService.show();
  setTimeout(()=>this.spinnerService.hide(),3000)
}

}
