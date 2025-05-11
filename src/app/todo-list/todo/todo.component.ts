import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';  
import { Task } from '../task.model';  // Assurez-vous que Task est bien défini
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo', 
  standalone: true,  //standalone

  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',  
  styleUrls: ['./todo.component.css']  
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];  
  newTaskTitle: string = '';  
  newTaskAuthor: string = '';  // Ajouter le champ pour l'auteur
  newTaskTags: string = '';  // Ajouter le champ pour les tags
  
  constructor(private todoService: TodoService) {}

ngOnInit(): void {
  this.todoService.getTasks().subscribe(tasks => this.tasks = tasks);
}
  // Méthode pour ajouter une tâche
  addTask(): void {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: this.newTaskTitle.trim(),
        author: this.newTaskAuthor.trim() || 'Anonymous', 
        completed: false,
        tags: this.newTaskTags.trim().split(',').map(tag => tag.trim()) 
      };
      this.todoService.addTask(newTask);
      this.newTaskTitle = '';  
      this.newTaskAuthor = '';  
      this.newTaskTags = '';    
    }
  }

  // Méthode pour supprimer une tâche par son ID
  deleteTask(id: number): void {
    this.todoService.deleteTask(id);
  }

  toggleCompletion(task: Task): void {
    task.completed = !task.completed; // Toggle l'état de complétion
    this.todoService.updateTask(task);  // Met à jour la tâche via le service
  }
  // Méthode pour le tracking des tâches par ID (optimisation)
  trackTaskById(index: number, task: Task): number {
    return task.id;
  }
clearCompletedTasks(): void {
  this.tasks = this.tasks.filter(task => !task.completed);
  this.todoService.clearCompletedTasks(); // Si tu veux mettre à jour dans le service
      this.newTaskTitle = '';  
      this.newTaskAuthor = '';  
      this.newTaskTags = '';  
}

}
