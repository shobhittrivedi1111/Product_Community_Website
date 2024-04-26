package com.nagarro.controller;

import com.nagarro.model.CommentModel;
import com.nagarro.repository.CommentRepository;
import com.nagarro.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CommentController {
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    CommentService commentService;


    //    --------------------Comment Control----------------------
//    Get All Comment REST API
    @RequestMapping(value = "/comment", method = RequestMethod.GET)
    @ResponseBody
    public List<CommentModel> getAllComment() {
        List<CommentModel> commentModelList = commentService.getCommentDetails();
        return commentModelList;
    }

    //    Insert Comment REST API
    @PostMapping("/comment")
    @ResponseBody
    public CommentModel commentDetails(@RequestBody CommentModel comment) {
        return commentService.insertCommentDetail(comment);
    }

    //    Get Comment by ParentId Rest API
    @GetMapping("/filtercomment")
    public ResponseEntity<List<CommentModel>> getCommentByPid(@RequestParam("pid") Integer pid){
        return ResponseEntity.ok(commentService.searchComments(pid));
    }

    //    Get Comment By Id REST API
    @GetMapping("/comment/{id}")
    @ResponseBody
    public Optional<CommentModel> getCommentById(@PathVariable Integer id) {
        Optional<CommentModel> commentModel=commentService.getCommentById(id);
        return commentModel;
    }


    @PutMapping("/editcomment/{id}/{msg}")
    public Optional<CommentModel> editComment(@PathVariable() Integer id, @PathVariable() String msg) {

        Optional<CommentModel> commentModel = commentService.getCommentById(id);

        CommentModel commentModel1 = commentModel.get();
        commentModel1.setMessage(msg);
        commentService.saveEditComment(commentModel1);
        return commentModel;
    }

//    @PutMapping("/updatecomment")
//    public List<CommentModel> update(CommentModel commentModel) {
////        ModelAndView mv = new ModelAndView("home");
//        commentService.updateComment(commentModel);
//        List<CommentModel> commentModelList = commentService.getCommentDetails();
//        return commentModelList;
//    }

    @DeleteMapping("/deletecomment/{id}")
    public void delete(@PathVariable Integer id) {
        commentService.deleteCommentById(id);
    }

}