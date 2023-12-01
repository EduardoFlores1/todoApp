import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {

  welcome = 'Hello!';

  tasks = signal([
      'Rubiñozzzzzz',
      'Markiñozzzzz',
      'Neymiñoooooo'
  ]);

  name = 'Eduardo';
  status = true;
  url = 'https://th.bing.com/th/id/R.2f115c071e0ac0740a41671501a2d60f?rik=hv%2fJr8diAPfNKg&riu=http%3a%2f%2fnewsmobile.in%2fwp-content%2fuploads%2f2020%2f02%2fronaldo-1.jpg&ehk=cBxOyWZ0r00S5AULWUfVhEDub9Rq97tF9IwHVwgXICY%3d&risl=&pid=ImgRaw&r=0';

  persona = {
    nombre: 'Eduardo',
    url: 'https://th.bing.com/th/id/R.2f115c071e0ac0740a41671501a2d60f?rik=hv%2fJr8diAPfNKg&riu=http%3a%2f%2fnewsmobile.in%2fwp-content%2fuploads%2f2020%2f02%2fronaldo-1.jpg&ehk=cBxOyWZ0r00S5AULWUfVhEDub9Rq97tF9IwHVwgXICY%3d&risl=&pid=ImgRaw&r=0'
  }

  clickHandler() {
    alert("Evento Click")
  }


  cambia = signal('Eduardo');

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.cambia.set(input.value);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value)
  }

  person = signal({
    name: 'nicolas',
    age: 21
  })

  colorCtrl = new FormControl;
  widthControl = new FormControl(50, {
    nonNullable: true,
  });
  nameControl = new FormControl("", {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });


  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value)
    })
  }

  changeAge(event : Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(personState => {
      return {
        ...personState,
        age: parseInt(newValue, 10)
      }
    })
  }
}
