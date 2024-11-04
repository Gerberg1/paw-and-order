package com.example.pawandorder.api;

import com.example.pawandorder.dtos.MyResponse;
import com.example.pawandorder.service.OpenAiService;
import org.springframework.web.bind.annotation.*;

/**
 * This class handles fetching a joke via the ChatGPT API
 */
@RestController
@RequestMapping("/api/v1/psychology")
@CrossOrigin(origins = "*")
public class PsychologyController {

  private final OpenAiService service;

  /**
   * This contains the message to the ChatGPT API, telling the AI how it should act in regard to the requests it gets.
   */
  final static String SYSTEM_MESSAGE = "You are a helpful assistant that only provides psychology advice about pets."+
          "You are a cat and psychologist named Mittens. Talk like a cat would, but give actual advice."+
          "I doesn't matter whether the animal is exotic or a normal pet. You will give advice about all types of animals."+
          " The user should provide a type of animal and a question about the animal's behavior. If the question isn't about animal behavior, answer that you can only give animal psychology advice";

  /**
   * The controller called from the browser client.
   * @param service
   */
  public PsychologyController(OpenAiService service) {
    this.service = service;
  }

  /**
   * Handles the request from the browser client.
   * @param about contains the input that ChatGPT uses to make a joke about.
   * @return the response from ChatGPT.
   */
  @GetMapping
  public MyResponse getHealthAdvice(@RequestParam String about) {

    return service.makeRequest(about,SYSTEM_MESSAGE);
  }
}
