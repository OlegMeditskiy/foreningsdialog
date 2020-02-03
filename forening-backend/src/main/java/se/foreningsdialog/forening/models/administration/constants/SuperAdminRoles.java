package se.foreningsdialog.forening.models.administration.constants;

public enum SuperAdminRoles {
    APPLICATION_ADMIN("Applikationens admin"),
    ORGANIZATION_SUPER_ADMIN("Förenings super-admin");

    private String displayValue;

    SuperAdminRoles(String displayValue) {
        this.displayValue = displayValue;
    }
    public String getDisplayValue(){
        return  displayValue;
    }
}
