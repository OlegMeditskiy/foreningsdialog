package se.foreningsdialog.forening.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.foreningsdialog.forening.payload.common.LoginRequest;
import se.foreningsdialog.forening.payload.common.SignUpRequest;
import se.foreningsdialog.forening.payload.guestRegister.GuestRegisterRequest;
import se.foreningsdialog.forening.service.AuthService;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final
    AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
       return authService.authenticateUser(loginRequest);
    }


    @PostMapping("/signupGuest")
    public ResponseEntity<?> registerGuest(@Valid @RequestBody GuestRegisterRequest guestRegisterRequest) {
return authService.registerGuest(guestRegisterRequest);
    }

    @PostMapping("/createMainAdmin")
    public ResponseEntity<?> registerMainAdmin(@Valid @RequestBody SignUpRequest signUpRequest) {
      return authService.registerMainAdmin(signUpRequest);
    }


    @PostMapping(value = "/signup",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerUser(@RequestPart("file") @Valid @NotNull @NotBlank @RequestParam MultipartFile file,
                                          @RequestPart ("properties") @Valid SignUpRequest signUpRequest) {
       return authService.registerUser(file,signUpRequest);
    }
}
