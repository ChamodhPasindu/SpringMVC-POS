package lk.ijse.spring.service.impl;

import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.repo.OrderRepo;
import lk.ijse.spring.service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public String generateId() {
        String id=repo.generateId();
        if (!(id ==null)){
            int tempId = Integer.parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                return "OID-00" + tempId;

            } else if (tempId <= 99) {
                return "OID-0" + tempId;

            } else {
                return "OID-" + tempId;
            }
        }else{
            return  "OID-001";
        }
    }
}
