package com.nagarro.model;
import org.springframework.stereotype.Component;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;
@Component
@Entity
public class QuestionModel {
    @Id
    private int id;
    private String subject;
    private String email;
    private Date date;
    private String product;
    private String message;

    public QuestionModel(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "QuestionModel{" +
                "id=" + id +
                ", subject='" + subject + '\'' +
                ", email='" + email + '\'' +
                ", date=" + date +
                ", product='" + product + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
