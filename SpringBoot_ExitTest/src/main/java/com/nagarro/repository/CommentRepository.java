package com.nagarro.repository;

import com.nagarro.model.CommentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentModel, Integer> {

    @Query(value = "select * from comment where " +
            " parentid = :pid " , nativeQuery = true)
    List<CommentModel> searchComments(Integer pid);

}
