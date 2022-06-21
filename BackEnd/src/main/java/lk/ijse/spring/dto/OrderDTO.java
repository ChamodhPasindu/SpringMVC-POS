package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class OrderDTO {
    private ArrayList<OrderDetailDTO> orderDetail;
    private String orderId;
    private String custId;
    private String date;
    private double cost;
    private int discount;

}
