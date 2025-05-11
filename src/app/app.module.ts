import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TodoModule } from './todo-list/todo.module'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TodoModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
