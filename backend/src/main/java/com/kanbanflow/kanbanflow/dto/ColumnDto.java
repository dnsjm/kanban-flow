package com.kanbanflow.kanbanflow.dto;

import lombok.Data;
import java.util.List;

@Data
public class ColumnDto {
    private Long id;
    private String name;
    private List<TaskDto> tasks;
}
