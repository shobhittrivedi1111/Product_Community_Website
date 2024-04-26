package com.nagarro.services;

import com.nagarro.model.CommentModel;
import com.nagarro.model.QuestionModel;
import com.nagarro.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    public List<CommentModel> getCommentDetails() {
        List<CommentModel> commentModelList = (List<CommentModel>) commentRepository.findAll();
        return commentModelList;
    }
    public CommentModel insertCommentDetail(CommentModel comment) {
        Date date=new Date();
        comment.setDate(date);
        return commentRepository.save(comment);
    }
    public Optional<CommentModel> getCommentById(int id) {
        return commentRepository.findById(id);
    }
    public List<CommentModel> searchComments(Integer pid) {
        List<CommentModel> commentModelList=commentRepository.searchComments(pid);
        return commentModelList;
    }
    public void deleteCommentById(int id) {
        commentRepository.deleteById(id);
    }

//    public void updateComment(CommentModel commentModel) {
//        Optional<CommentModel> obj = commentRepository.findById(commentModel.getId());
//        if (obj.isPresent()) {
//            CommentModel result = obj.get();
//            result.setParentid(commentModel.getParentid());
//            result.setEmail(commentModel.getEmail());
//            result.setMessage(commentModel.getMessage());
//            commentRepository.save(result);
//        }
//    }
    public void saveEditComment(CommentModel commentModel){
        commentRepository.save(commentModel);
    }

}
