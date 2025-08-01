package com.kanbanflow.kanbanflow.controller;

import com.kanbanflow.kanbanflow.model.Task;
import com.kanbanflow.kanbanflow.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.createTask(task));
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody Task task) {
        task.setId(taskId);
        return ResponseEntity.ok(taskService.updateTask(task));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok().build();
    }
}
