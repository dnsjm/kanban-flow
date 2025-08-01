package com.kanbanflow.kanbanflow.repository;

import com.kanbanflow.kanbanflow.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByOwnerId(Long userId);
}
