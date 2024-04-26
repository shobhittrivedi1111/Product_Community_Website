package com.nagarro.repository;

import com.nagarro.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel, Integer> {

//    public UserModel findByUsernameAndPassword(String username, String password);

    public UserModel findByEmail(String email);
    public UserModel findByEmailAndPassword(String email, String password);

}
