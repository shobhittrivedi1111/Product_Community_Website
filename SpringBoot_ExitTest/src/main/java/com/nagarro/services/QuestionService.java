package com.nagarro.services;

import com.nagarro.model.QuestionModel;
import com.nagarro.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    public List<QuestionModel> getQuestionDetails() {
        List<QuestionModel> questionList = (List<QuestionModel>) questionRepository.findAll();
        return questionList;
    }

    public QuestionModel insertQuestionDetail(QuestionModel question) {
        Date date=new Date();
        question.setDate(date);
        return questionRepository.save(question);
    }

    public Optional<QuestionModel> getQuestionById(int id) {
        return questionRepository.findById(id);
    }

    public List<QuestionModel> searchQuestionsByEmail(String query) {
        List<QuestionModel> questionModelList=questionRepository.searchEmail(query);
        return questionModelList;
    }

    public List<QuestionModel> searchQuestions(String query) {
        List<QuestionModel> questionModelList=questionRepository.searchQuestions(query);
        return questionModelList;
    }


}
