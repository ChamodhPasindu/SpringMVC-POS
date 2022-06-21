package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.ItemService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    @Autowired
    private CustomerRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public ItemDTO searchItem(String id) {
        return null;
    }
}
