package se.foreningsdialog.forening.payload.common;

import se.foreningsdialog.forening.models.Association;
import se.foreningsdialog.forening.models.Organization;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


public class SignUpRequest {
    @NotBlank
    @Size(max = 40)
    @Email
    private String username;


    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    private Association association;

    public Association getAssociation() {
        return association;
    }

    public void setAssociation(Association association) {
        this.association = association;
    }

    private Organization organization;

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
