import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from "./../../models/task.interface";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear Proyecto',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear Componentes',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear Servicios',
      completed: false
    }
  ])

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }

    this.tasks.update((tasks) => [...tasks, newTask])
  }

  updateTask(i: number) {
    this.tasks.update(tasks => {
      const updateTask = tasks[i];
      updateTask.completed = !updateTask.completed;
      return tasks;
    })
  }

  deleteTasks(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, posicion) => posicion !== index));
  }
}
