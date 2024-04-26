package com.nagarro.repository;

import com.nagarro.model.QuestionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface QuestionRepository extends JpaRepository<QuestionModel, Integer> {
    @Query(value = "select * from question_model where " +
            " subject like %:query% " +
            " or message like %:query% " +
            " or product like %:query% ", nativeQuery = true)
    List<QuestionModel> searchQuestions(String query);

    @Query(value = "select * from question_model where " +
            " email = :query " , nativeQuery = true)
    List<QuestionModel> searchEmail(String query);

//concat('%', :query, '%')
}