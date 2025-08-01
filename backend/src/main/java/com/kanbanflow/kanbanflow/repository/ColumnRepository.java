package com.kanbanflow.kanbanflow.repository;

import com.kanbanflow.kanbanflow.model.Column;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColumnRepository extends JpaRepository<Column, Long> {
}
