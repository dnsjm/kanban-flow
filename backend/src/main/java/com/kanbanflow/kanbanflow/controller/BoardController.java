package com.kanbanflow.kanbanflow.controller;

import com.kanbanflow.kanbanflow.dto.BoardDto;
import com.kanbanflow.kanbanflow.model.Board;
import com.kanbanflow.kanbanflow.model.User;
import com.kanbanflow.kanbanflow.repository.UserRepository;
import com.kanbanflow.kanbanflow.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<BoardDto>> getAllBoards(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(boardService.getAllBoardsForUser(user.getId()));
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<BoardDto> getBoardById(@PathVariable Long boardId) {
        return ResponseEntity.ok(boardService.getBoardById(boardId));
    }

    @PostMapping
    public ResponseEntity<Board> createBoard(@RequestBody Board board, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        board.setOwner(user);
        return ResponseEntity.ok(boardService.createBoard(board));
    }
}
