package com.nagarro.controller;

import com.nagarro.model.UserModel;
import com.nagarro.repository.UserRepository;
import com.nagarro.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class LoginController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

//    Insert User Details REST API
    @PostMapping("/users")
    @ResponseBody
    public UserModel User(@RequestBody UserModel user) throws Exception {
        String tempEmailId = user.getEmail();
        if (tempEmailId != null && !"".equals(tempEmailId)) {
            UserModel userobj = userService.fetchUserByEmailId(tempEmailId);
            if (userobj != null) {
                throw new Exception("User with " + tempEmailId + " is already exist");
            }
        }
        UserModel userObj = null;
        userObj = userService.saveUser(user);
        return userObj;
    }

//    /** Login User */
    @PostMapping("/login")
    @ResponseBody
    public UserModel loginUser(@RequestBody UserModel user) throws Exception {
        String tempEmail = user.getEmail();
        String tempPass = user.getPassword();
        UserModel userObj = null;
        if(tempEmail != null && tempPass != null){
            userObj = userService.fetchUserByEmailAndPassword(tempEmail,tempPass);
        }
        if(userObj == null){
            throw new Exception("User does not exist");
        }
        return userObj;
    }
}