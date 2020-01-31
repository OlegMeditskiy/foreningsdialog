package se.foreningsdialog.forening.models.loanobjects;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.foreningsdialog.forening.models.Member;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue(value = "2")
@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@NoArgsConstructor
public class Laundry extends AbstractLoanObject {

    private int passLength;

    public Laundry(int passLength) {
        this.passLength = passLength;
    }


    private LocalDateTime to;
    private LocalDateTime from;
    @ManyToOne
    private Member member;
}
