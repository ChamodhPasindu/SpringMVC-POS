package lk.ijse.spring.service.impl;

import antlr.Token;
import jdk.nashorn.internal.parser.TokenType;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public CustomerDTO searchCustomer(String id) {
        if (repo.existsById(id)) {
            return mapper.map(repo.findById(id).get(), CustomerDTO.class);
        } else {
            throw new RuntimeException("No Customer For " + id);
        }
    }

    @Override
    public void saveCustomer(CustomerDTO dto) {
        if (!repo.existsById(dto.getId())) {
            repo.save(mapper.map(dto, Customer.class));
        } else {
            throw new RuntimeException("Customer Already Added..!");
        }
    }

    @Override
    public void updateCustomer(CustomerDTO dto) {
        if (repo.existsById(dto.getId())) {
            repo.save(mapper.map(dto, Customer.class));
        } else {
            throw new RuntimeException("No Such Customer To Update..! Please Check the ID..!");
        }
    }

    @Override
    public void deleteCustomer(String id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
        } else {
            throw new RuntimeException("Please check the Customer ID.. No Such Customer..!");
        }
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return mapper.map(repo.findAll(), new TypeToken<List<CustomerDTO>>() {
        }.getType());
    }

    @Override
    public List<String> getAllCustomerIds() {
        return repo.findAllIds();
    }

    @Override
    public long customerCount(){
        return repo.count();
    }
}
