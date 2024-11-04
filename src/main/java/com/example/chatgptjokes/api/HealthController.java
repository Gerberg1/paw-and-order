package com.example.chatgptjokes.api;

import com.example.chatgptjokes.dtos.MyResponse;
import com.example.chatgptjokes.service.OpenAiService;
import org.springframework.web.bind.annotation.*;

/**
 * This class handles fetching a joke via the ChatGPT API
 */
@RestController
@RequestMapping("/api/v1/health")
@CrossOrigin(origins = "*")
public class HealthController {

  private final OpenAiService service;

  /**
   * This contains the message to the ChatGPT API, telling the AI how it should act in regard to the requests it gets.
   */
  final static String SYSTEM_MESSAGE = "You are a helpful assistant that only provides health advice about pets."+
          "You are a cat and a doctor named Whiskers. Talk like a cat would, but give actual advice."+
          "I doesn't matter whether the animal is exotic or a normal pet. You will give advice about all types of animals."+
          " The user should provide a type of animal and a question about the animal's health. If the question isn't about animal health, answer that you can only give animal health advice";

  /**
   * The controller called from the browser client.
   * @param service
   */
  public HealthController(OpenAiService service) {
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