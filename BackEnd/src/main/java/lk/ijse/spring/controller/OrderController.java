package lk.ijse.spring.controller;

import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.service.OrderService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/order")
@CrossOrigin
public class OrderController {


    @Autowired
    OrderService orderService;

    @GetMapping(path = "generateId",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generateId(){
        return new ResponseUtil(200,"Done",orderService.generateId());
    }
}
