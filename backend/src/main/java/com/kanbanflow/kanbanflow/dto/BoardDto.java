package com.kanbanflow.kanbanflow.dto;

import lombok.Data;
import java.util.List;

@Data
public class BoardDto {
    private Long id;
    private String name;
    private List<ColumnDto> columns;
}
