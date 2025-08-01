package com.kanbanflow.kanbanflow.service;

import com.kanbanflow.kanbanflow.dto.BoardDto;
import com.kanbanflow.kanbanflow.model.Board;
import com.kanbanflow.kanbanflow.repository.BoardRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<BoardDto> getAllBoardsForUser(Long userId) {
        return boardRepository.findByOwnerId(userId).stream()
                .map(board -> modelMapper.map(board, BoardDto.class))
                .collect(Collectors.toList());
    }

    public BoardDto getBoardById(Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found"));
        return modelMapper.map(board, BoardDto.class);
    }

    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }
}