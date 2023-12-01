import { Component, signal, computed, effect, inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from "./../../models/task.interface";
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private injector = inject(Injector);

  tasks = signal<Task[]>([])

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });

  filter = signal<'all' | 'pending' | 'completed'>('all');

  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if(filter === 'pending') {
      return tasks.filter(task => !task.completed)
    }
    if(filter === 'completed') {
      return tasks.filter(task => task.completed)
    }

    return tasks
  });

  ngOnInit(): void {
    const storage = localStorage.getItem('tasks');
    if(storage) {
      const tasks  = JSON.parse(storage);
      this.tasks.set(tasks);
    }

    this.trackTasks();
  }


  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }

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
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === i) {
          return {
            ...task,
            completed: !task.completed
          }
        }

        return task;
      })
    });
  }

  deleteTasks(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, posicion) => posicion !== index));
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true
          }
        }

        return {
          ...task,
          editing: false
        };
      })
    })
  }

  updateTaskText(index: number, event: Event) {

    const input = event.target as HTMLInputElement;

    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false,
          }
        }

        return task;
      })
    })
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }

  trackTasks() {
    effect(() => {
        const tasks = this.tasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, { injector: this.injector })
  }

}
