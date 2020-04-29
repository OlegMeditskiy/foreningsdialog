package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.foreningsdialog.forening.models.loanobjects.AbstractLoanObject;

@Repository
public interface AbstractLoanObjectRepository extends JpaRepository<AbstractLoanObject,Long> {

}
