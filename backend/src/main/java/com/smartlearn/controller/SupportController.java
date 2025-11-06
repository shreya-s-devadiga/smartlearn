package com.smartlearn.controller;

import com.smartlearn.dto.SupportRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SupportController {

  @PostMapping("/support")
  public ResponseEntity<?> support(@RequestBody SupportRequest req){
    String em = req.getEmotion()==null? "neutral" : req.getEmotion();
    String msg = req.getUserMsg()==null? "" : req.getUserMsg();
    String tip;
    switch (em.toLowerCase()){
      case "happy": tip = "Keep the momentum! Try a new challenge lesson today."; break;
      case "sad": tip = "Take a short break, breathe, then try an easy win activity."; break;
      case "angry": tip = "Count to 10 and stretch. A calm puzzle can help reset."; break;
      case "surprised": tip = "Channel that curiosity into a quick quiz!"; break;
      default: tip = "You're doing great. Small steps are still steps."; 
    }
    return ResponseEntity.ok(new Tip("Based on your mood, here’s a suggestion: " + tip));
  }

  record Tip(String solution){}
}