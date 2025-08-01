package com.kanbanflow.kanbanflow.controller;

import com.kanbanflow.kanbanflow.model.Column;
import com.kanbanflow.kanbanflow.service.ColumnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/columns")
public class ColumnController {

    @Autowired
    private ColumnService columnService;

    @PostMapping
    public ResponseEntity<Column> createColumn(@RequestBody Column column) {
        return ResponseEntity.ok(columnService.createColumn(column));
    }

    @DeleteMapping("/{columnId}")
    public ResponseEntity<Void> deleteColumn(@PathVariable Long columnId) {
        columnService.deleteColumn(columnId);
        return ResponseEntity.ok().build();
    }
}
