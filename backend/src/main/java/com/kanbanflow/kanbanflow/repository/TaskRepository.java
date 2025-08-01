package com.kanbanflow.kanbanflow.repository;

import com.kanbanflow.kanbanflow.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
