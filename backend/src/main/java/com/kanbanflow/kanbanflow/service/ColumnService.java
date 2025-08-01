package com.kanbanflow.kanbanflow.service;

import com.kanbanflow.kanbanflow.model.Column;
import com.kanbanflow.kanbanflow.repository.ColumnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ColumnService {

    @Autowired
    private ColumnRepository columnRepository;

    public Column createColumn(Column column) {
        return columnRepository.save(column);
    }

    public void deleteColumn(Long columnId) {
        columnRepository.deleteById(columnId);
    }
}
