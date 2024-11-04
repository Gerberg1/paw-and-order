package com.example.chatgptjokes.api;



import com.example.chatgptjokes.dtos.MyResponse;
import com.example.chatgptjokes.service.OpenAiService;
import org.springframework.web.bind.annotation.*;

/**
 * This class handles self made replies that the ChatGPT AI has not been trained with.
 */
@RestController
@RequestMapping("/api/v1/owninfo")
@CrossOrigin(origins = "*")
public class OwnInfoController {

  private final String SYSTEM_MESSAGE="You are a helpful assistant. When using any of the following links make your response as short as possible."
          +"When asked about who made this ChatGPT example, reply with MAS"
          +"When asked about where to find this example code, reply with link to this github repository: https://github.com/Gerberg1/paw-and-order";

  OpenAiService openAiService;

  /**
   * The controller called from the frontend client.
   * @param openAiService
   */
  public OwnInfoController(OpenAiService openAiService) {
    this.openAiService = openAiService;
  }

  /**
   * Handles the request from the browser client.
   * @param question to handle
   * @return the response from ChatGPT.
   */
  @GetMapping
  public MyResponse getInfo(@RequestParam String question){
    return openAiService.makeRequest(question,SYSTEM_MESSAGE);
  }
}
