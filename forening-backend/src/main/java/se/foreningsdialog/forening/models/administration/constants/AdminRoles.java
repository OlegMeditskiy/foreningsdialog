package se.foreningsdialog.forening.models.administration.constants;


public enum AdminRoles {
    NOT_ADMIN("Är inte admin"),
    EXTERNAL_CONTACT("Extern kontakt"),
    ORGANIZATION_ADMIN("Förenings admin");

    private String displayValue;

    AdminRoles(String displayValue) {
        this.displayValue = displayValue;
    }
    public String getDisplayValue(){
        return  displayValue;
    }


}
