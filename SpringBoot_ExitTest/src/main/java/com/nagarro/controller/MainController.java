package com.nagarro.controller;

import com.nagarro.model.QuestionModel;
import com.nagarro.model.UserModel;
import com.nagarro.repository.CommentRepository;
import com.nagarro.repository.QuestionRepository;
import com.nagarro.services.CommentService;
import com.nagarro.services.QuestionService;
import com.nagarro.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class MainController {
    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentService commentService;


    //    -----------Question Control-----------------------------
//    Get All community qsn REST API
    @RequestMapping(value = "/questions", method = RequestMethod.GET)
    @ResponseBody
    public List<QuestionModel> home() {
        List<QuestionModel> questionList1 = questionService.getQuestionDetails();
        return questionList1;
    }

//    Insert community qsn by id REST API
    @PostMapping("/questions")
    @ResponseBody
    public QuestionModel communityDetails(@RequestBody QuestionModel question) {
        return questionService.insertQuestionDetail(question);
    }

//    Get community qsn by id REST API
    @GetMapping("/questions/{id}")
    @ResponseBody
    public Optional<QuestionModel> getQuestionById(@PathVariable Integer id) {
        Optional<QuestionModel> questionModel=questionService.getQuestionById(id);
        return questionModel;
    }

    @GetMapping("/filterbyemail")
    public ResponseEntity<List<QuestionModel>> searchQsnByEmail(@RequestParam("query") String query){
        return ResponseEntity.ok(questionService.searchQuestionsByEmail(query));
    }


//    Update Community qsn by id REST API
//    @PutMapping("/questions/{id}")
//    public List<QuestionModel> update(@PathVariable Integer id, @RequestBody QuestionModel questionModel) {
//        questionService.updateQuestions(questionModel);
//        List<QuestionModel> questionDetails = questionService.getQuestionDetails();
//        return questionDetails;
//    }

//    Search Questions Rest API
    @GetMapping("/search")
    public ResponseEntity<List<QuestionModel>> searchQuestions(@RequestParam("query") String query){
        return ResponseEntity.ok(questionService.searchQuestions(query));
    }

//  --------------------User Login Control-----------------------
    @RequestMapping(value = "/allusers", method = RequestMethod.GET)
    @ResponseBody
    public List<UserModel> getUserDetails() {
        List<UserModel> userList = userService.getAllUserDetails();
        return userList;
    }

}
