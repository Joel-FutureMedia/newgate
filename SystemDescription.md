Below is the prompts given to lovable to build the frontend, 

We are building a website for a new company:
Project Name: NewGrate Investments 
Primary Colors: #b65f50
Secondary Colors: #a89f91
Third Colors: #000000

Project: Description, newgate is an investment company that focus on real estate, construction and designing houses and real estates in Namibia.
The contact details is as follows
email address: info@newgate.com.na
Tel: +264 61 829 1310
Address: Windhoek Namibia.
Services: List them for me please based on the Description I gave you. List atleast 3 minimum. 


For this project There is going to be frontend and backend. For Backend, we are using java springboot and below is the whole sprinboot codes and endpoints that you need for this project:
1.	Models 
a)	User model
package com.example.simplyfoundapis.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String email;
    private String password;
    private String name;

}

b)	Status model
package com.example.simplyfoundapis.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="status")
public class Status {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String statusname;

}


c)	Projects model
package com.example.simplyfoundapis.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="projects")
public class Projects {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String projectName;
    private String projectDescription;
    private String clientName;
    private String projectType;
    private String projectAddress;
    private LocalDateTime startDate;
    private LocalDateTime CompletionDate;
    private String fileUrl;
    private String fileType;
    @ManyToOne
    private Status status;

}

d)	NewsBlog model
package com.example.simplyfoundapis.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="news_blog")
@Entity
public class NewsBlog {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String title;
    private String description;
    private String fileUrl;
    private String fileType;
    private LocalDateTime createdDate;

}

e)	Hero Section Model
package com.example.simplyfoundapis.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="hero_section")
public class HeroSection {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String tittle;
    private String description;
    private String fileUrl;
    private String fileType;
}


2.	Services files
a)	
package com.example.simplyfoundapis.services;

import com.example.simplyfoundapis.models.User;
import com.example.simplyfoundapis.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // POST - Create new user
    public User saveNewUser(User newUser) {
        return userRepository.save(newUser);
    }

    // GET - Retrieve all users
    public List<User> findAll() {
        return userRepository.findAll();
    }

    // GET - Retrieve user by ID
    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }

    // DELETE - Delete user by ID
    public void deleteById(int id) {
        userRepository.deleteById(id);
    }

    // PUT - Update user info
    public User updateUser(User newUser) {
        User oldUser = userRepository.findById(newUser.getId()).get();
        oldUser.setEmail(newUser.getEmail());
        oldUser.setPassword(newUser.getPassword());
        oldUser.setName(newUser.getName());
        return userRepository.save(oldUser);
    }

    // Login functionality
    public String login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return "Login successful!";
        } else {
            return "Invalid email or password!";
        }
    }
}

b)	
package com.example.simplyfoundapis.services;

import com.example.simplyfoundapis.models.Status;
import com.example.simplyfoundapis.repositories.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatusService {
    @Autowired
    private StatusRepository statusRepository;

    //post Method
    public Status saveNewStatus(Status newStatus){
        return statusRepository.save(newStatus);
    }
    //Get All status
    public List<Status> findAll(){
        return statusRepository.findAll();
    }

    //get by Id
    public Optional<Status> findById(int id){
        return statusRepository.findById(id);
    }

    public void deleteById(int id){
        statusRepository.deleteById(id);
    }

    public Status updateStatus(Status  newStatus){
       Status oldStatus = statusRepository.findById(newStatus.getId()).get();
       oldStatus.setStatusname(newStatus.getStatusname());
        return statusRepository.save(oldStatus);
    }



}

c)	
package com.example.simplyfoundapis.services;

import com.example.simplyfoundapis.models.Projects;
import com.example.simplyfoundapis.models.Status;
import com.example.simplyfoundapis.repositories.ProjectsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectsService {

    @Autowired
    private ProjectsRepository projectsRepository;

    @Autowired
    private StatusService statusService;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/projects/";

    private static final List<String> ALLOWED_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/gif",
            "video/mp4",
            "video/mpeg",
            "video/quicktime"
    );

    public Projects uploadProject(MultipartFile file, String projectName, String projectDescription,
                                  String clientName, String projectType, String projectAddress,
                                  LocalDateTime startDate, LocalDateTime completionDate, int statusId) throws IOException {

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Only images and videos are allowed");
        }

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) uploadDir.mkdirs();

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
        String fileName = originalFileName.substring(0, originalFileName.lastIndexOf('.'))
                + "_" + System.currentTimeMillis() + extension;

        Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        String fileUrl = "https://api.simplyfound.com.na/api/projects/view/" + fileName;

        Status status = statusService.findById(statusId)
                .orElseThrow(() -> new RuntimeException("Status not found"));

        Projects project = new Projects();
        project.setProjectName(projectName);
        project.setProjectDescription(projectDescription);
        project.setClientName(clientName);
        project.setProjectType(projectType);
        project.setProjectAddress(projectAddress);
        project.setStartDate(startDate);
        project.setCompletionDate(completionDate);
        project.setFileType(contentType);
        project.setFileUrl(fileUrl);
        project.setStatus(status);

        return projectsRepository.save(project);
    }

    public Resource loadFileAsResource(String fileName) throws MalformedURLException {
        Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (!resource.exists() || !resource.isReadable()) {
            throw new RuntimeException("File not found or unreadable: " + fileName);
        }
        return resource;
    }

    public List<Projects> getAllProjects() {
        return projectsRepository.findAll();
    }

    public Optional<Projects> getProjectById(int id) {
        return projectsRepository.findById(id);
    }

    public List<Projects> getProjectsByStatus(int statusId) {
        return projectsRepository.findByStatusId(statusId);
    }

    public Projects updateProject(int id, MultipartFile file, String projectName, String projectDescription,
                                  String clientName, String projectType, String projectAddress,
                                  LocalDateTime startDate, LocalDateTime completionDate, Integer statusId) throws IOException {

        Projects existing = projectsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (file != null && !file.isEmpty()) {
            String contentType = file.getContentType();
            if (contentType == null || !ALLOWED_TYPES.contains(contentType)) {
                throw new IllegalArgumentException("Only images and videos are allowed");
            }

            String originalFileName = file.getOriginalFilename();
            String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
            String fileName = originalFileName.substring(0, originalFileName.lastIndexOf('.'))
                    + "_" + System.currentTimeMillis() + extension;

            Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = "https://api.simplyfound.com.na/api/projects/view/" + fileName;
            existing.setFileUrl(fileUrl);
            existing.setFileType(contentType);
        }

        existing.setProjectName(projectName);
        existing.setProjectDescription(projectDescription);
        existing.setClientName(clientName);
        existing.setProjectType(projectType);
        existing.setProjectAddress(projectAddress);
        existing.setStartDate(startDate);
        existing.setCompletionDate(completionDate);

        if (statusId != null) {
            Status status = statusService.findById(statusId)
                    .orElseThrow(() -> new RuntimeException("Status not found"));
            existing.setStatus(status);
        }

        return projectsRepository.save(existing);
    }

    public void deleteProject(int id) {
        Projects project = projectsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        projectsRepository.delete(project);
    }
}

d)	
package com.example.simplyfoundapis.services;

import com.example.simplyfoundapis.models.NewsBlog;
import com.example.simplyfoundapis.repositories.NewsBlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NewsBlogService {

    @Autowired
    private NewsBlogRepository newsBlogRepository;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/news/";

    private static final List<String> ALLOWED_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/gif",
            "video/mp4",
            "video/mpeg",
            "video/quicktime"
    );

    public NewsBlog uploadNews(MultipartFile file, String title, String description) throws IOException {
        if (file == null || file.isEmpty()) throw new IllegalArgumentException("File is required");

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType))
            throw new IllegalArgumentException("Only images and videos are allowed");

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) uploadDir.mkdirs();

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
        String fileName = originalFileName.substring(0, originalFileName.lastIndexOf('.'))
                + "_" + System.currentTimeMillis() + extension;

        Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        String fileUrl = "https://api.simplyfound.com.na/api/news/view/" + fileName;

        NewsBlog news = new NewsBlog();
        news.setTitle(title);
        news.setDescription(description);
        news.setFileUrl(fileUrl);
        news.setFileType(contentType);
        news.setCreatedDate(LocalDateTime.now());

        return newsBlogRepository.save(news);
    }

    public Resource loadFileAsResource(String fileName) throws MalformedURLException {
        Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (!resource.exists() || !resource.isReadable()) {
            throw new RuntimeException("File not found or unreadable: " + fileName);
        }
        return resource;
    }

    public List<NewsBlog> getAllNews() {
        return newsBlogRepository.findAll();
    }

    public Optional<NewsBlog> getNewsById(int id) {
        return newsBlogRepository.findById(id);
    }

    public NewsBlog updateNews(int id, MultipartFile file, String title, String description) throws IOException {
        NewsBlog existing = newsBlogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("NewsBlog not found"));

        if (file != null && !file.isEmpty()) {
            String contentType = file.getContentType();
            if (contentType == null || !ALLOWED_TYPES.contains(contentType))
                throw new IllegalArgumentException("Only images and videos are allowed");

            String originalFileName = file.getOriginalFilename();
            String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
            String fileName = originalFileName.substring(0, originalFileName.lastIndexOf('.'))
                    + "_" + System.currentTimeMillis() + extension;

            Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = "https://api.simplyfound.com.na/api/news/view/" + fileName;
            existing.setFileUrl(fileUrl);
            existing.setFileType(contentType);
        }

        existing.setTitle(title);
        existing.setDescription(description);

        return newsBlogRepository.save(existing);
    }

    public void deleteNews(int id) {
        NewsBlog news = newsBlogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("NewsBlog not found"));
        newsBlogRepository.delete(news);
    }
}

e)	
package com.example.simplyfoundapis.services;

import com.example.simplyfoundapis.models.HeroSection;
import com.example.simplyfoundapis.repositories.HeroSectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.List;

@Service
public class HeroSectionService {

    @Autowired
    private HeroSectionRepository heroSectionRepository;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/hero/";

    private static final List<String> ALLOWED_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/gif",
            "video/mp4",
            "video/mpeg",
            "video/quicktime"
    );

    public HeroSection uploadHero(MultipartFile file, String title, String description) throws IOException {
        if (file == null || file.isEmpty()) throw new IllegalArgumentException("File is required");

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType))
            throw new IllegalArgumentException("Only images and videos are allowed");

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) uploadDir.mkdirs();

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
        String fileName = originalFileName.substring(0, originalFileName.lastIndexOf('.'))
                + "_" + System.currentTimeMillis() + extension;

        Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        String fileUrl = "https://api.simplyfound.com.na/api/hero/view/" + fileName;

        HeroSection hero = new HeroSection();
        hero.setTittle(title);
        hero.setDescription(description);
        hero.setFileUrl(fileUrl);
        hero.setFileType(contentType);

        return heroSectionRepository.save(hero);
    }

    public Resource loadFileAsResource(String fileName) throws MalformedURLException {
        Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (!resource.exists() || !resource.isReadable()) {
            throw new RuntimeException("File not found or unreadable: " + fileName);
        }
        return resource;
    }

    public List<HeroSection> getAllHeroes() {
        return heroSectionRepository.findAll();
    }

    public HeroSection updateHero(int id, MultipartFile file, String title, String description) throws IOException {
        HeroSection existing = heroSectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("HeroSection not found"));

        if (file != null && !file.isEmpty()) {
            String contentType = file.getContentType();
            if (contentType == null || !ALLOWED_TYPES.contains(contentType))
                throw new IllegalArgumentException("Only images and videos are allowed");

            String originalFileName = file.getOriginalFilename();
            String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
            String fileName = originalFileName.substring(0, originalFileName.lastIndexOf('.'))
                    + "_" + System.currentTimeMillis() + extension;

            Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = "https://api.simplyfound.com.na/api/hero/view/" + fileName;
            existing.setFileUrl(fileUrl);
            existing.setFileType(contentType);
        }

        existing.setTittle(title);
        existing.setDescription(description);

        return heroSectionRepository.save(existing);
    }

    public void deleteHero(int id) {
        HeroSection hero = heroSectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("HeroSection not found"));
        heroSectionRepository.delete(hero);
    }
}



3.	Controller files
a)	
package com.example.simplyfoundapis.controllers;

import com.example.simplyfoundapis.models.User;
import com.example.simplyfoundapis.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")

public class UserController {
    @Autowired
    private UserService userService;

    // POST - Create new user
    @PostMapping("/post")
    public User post(@RequestBody User user) {
        return userService.saveNewUser(user);
    }

    // GET - Retrieve all users
    @GetMapping("/all")
    public List<User> findAll() {
        return userService.findAll();
    }

    // GET - Retrieve user by ID
    @GetMapping("/{id}")
    public Optional<User> findById(@PathVariable int id) {
        return userService.findById(id);
    }

    // PUT - Update user by ID
    @PutMapping("/{id}")
    public User update(@PathVariable int id, @RequestBody User user) {
        user.setId(id);
        return userService.updateUser(user);
    }

    // DELETE - Delete user by ID
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable int id) {
        userService.deleteById(id);
    }
    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        String response = userService.login(email, password);
        return ResponseEntity.ok(response);
    }
}

b)	
package com.example.simplyfoundapis.controllers;

import com.example.simplyfoundapis.models.Status;
import com.example.simplyfoundapis.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/status")
public class StatusController {
    @Autowired
    private StatusService statusService;

    //posting
    @PostMapping("/post")
    public Status post(@RequestBody Status status){
        return statusService.saveNewStatus(status);
    }

    //find all status
    @GetMapping("/all")
    public List<Status> findAll(){
        return statusService.findAll();
    }

    //find by Id
    @GetMapping("/{id}")
    public Optional<Status> findById(@PathVariable int id){
        return statusService.findById(id);
    }

    @PutMapping("/{id}")
    public Status update(@PathVariable int id, @RequestBody Status status){
        status.setId(id);
        return statusService.updateStatus(status);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable int id){
        statusService.deleteById(id);
    }

}


c)	
package com.example.simplyfoundapis.controllers;

import com.example.simplyfoundapis.models.Projects;
import com.example.simplyfoundapis.services.ProjectsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = {"https://simplyfound.vercel.app", "http://localhost:5173"},
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
        exposedHeaders = {"Content-Disposition", "Content-Type"},
        allowCredentials = "true")
public class ProjectsController {

    @Autowired
    private ProjectsService projectsService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadProject(
            @RequestParam("file") MultipartFile file,
            @RequestParam("projectName") String projectName,
            @RequestParam("projectDescription") String projectDescription,
            @RequestParam("clientName") String clientName,
            @RequestParam("projectType") String projectType,
            @RequestParam("projectAddress") String projectAddress,
            @RequestParam("startDate") String startDate,
            @RequestParam("completionDate") String completionDate,
            @RequestParam("statusId") int statusId) {
        try {
            Projects project = projectsService.uploadProject(
                    file, projectName, projectDescription, clientName, projectType,
                    projectAddress, LocalDateTime.parse(startDate), LocalDateTime.parse(completionDate), statusId);
            return ResponseEntity.ok(project);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Projects>> getAllProjects() {
        return ResponseEntity.ok(projectsService.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Projects> getProjectById(@PathVariable int id) {
        return projectsService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{statusId}")
    public ResponseEntity<List<Projects>> getProjectsByStatus(@PathVariable int statusId) {
        return ResponseEntity.ok(projectsService.getProjectsByStatus(statusId));
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFile(@PathVariable String fileName) throws MalformedURLException {
        Resource resource = projectsService.loadFileAsResource(fileName);
        String contentType;
        try {
            contentType = Files.probeContentType(resource.getFile().toPath());
        } catch (IOException e) {
            contentType = "application/octet-stream";
        }

        boolean displayInline = contentType.startsWith("image/") || contentType.startsWith("video/") || contentType.equals("application/pdf");

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        (displayInline ? "inline" : "attachment") + "; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProject(
            @PathVariable int id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("projectName") String projectName,
            @RequestParam("projectDescription") String projectDescription,
            @RequestParam("clientName") String clientName,
            @RequestParam("projectType") String projectType,
            @RequestParam("projectAddress") String projectAddress,
            @RequestParam("startDate") String startDate,
            @RequestParam("completionDate") String completionDate,
            @RequestParam(value = "statusId", required = false) Integer statusId) throws IOException {

        Projects updated = projectsService.updateProject(id, file, projectName, projectDescription,
                clientName, projectType, projectAddress, LocalDateTime.parse(startDate),
                LocalDateTime.parse(completionDate), statusId);

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable int id) {
        projectsService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}

d)	
package com.example.simplyfoundapis.controllers;

import com.example.simplyfoundapis.models.NewsBlog;
import com.example.simplyfoundapis.services.NewsBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = {"https://simplyfound.vercel.app", "http://localhost:5173"},
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
        exposedHeaders = {"Content-Disposition", "Content-Type"},
        allowCredentials = "true")
public class NewsBlogController {

    @Autowired
    private NewsBlogService newsBlogService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadNews(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description) {
        try {
            NewsBlog news = newsBlogService.uploadNews(file, title, description);
            return ResponseEntity.ok(news);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<NewsBlog>> getAllNews() {
        return ResponseEntity.ok(newsBlogService.getAllNews());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsBlog> getNewsById(@PathVariable int id) {
        return newsBlogService.getNewsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFile(@PathVariable String fileName) throws MalformedURLException {
        Resource resource = newsBlogService.loadFileAsResource(fileName);
        String contentType;
        try {
            contentType = Files.probeContentType(resource.getFile().toPath());
        } catch (IOException e) {
            contentType = "application/octet-stream";
        }

        boolean displayInline = contentType.startsWith("image/") || contentType.startsWith("video/") || contentType.equals("application/pdf");

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        (displayInline ? "inline" : "attachment") + "; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateNews(
            @PathVariable int id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description) throws IOException {
        NewsBlog updated = newsBlogService.updateNews(id, file, title, description);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable int id) {
        newsBlogService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }
}

e)	
package com.example.simplyfoundapis.controllers;

import com.example.simplyfoundapis.models.HeroSection;
import com.example.simplyfoundapis.services.HeroSectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.util.List;

@RestController
@RequestMapping("/api/hero")
@CrossOrigin(origins = {"https://simplyfound.vercel.app", "http://localhost:5173"},
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
        exposedHeaders = {"Content-Disposition", "Content-Type"},
        allowCredentials = "true")
public class HeroSectionController {

    @Autowired
    private HeroSectionService heroSectionService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadHero(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description) {
        try {
            HeroSection hero = heroSectionService.uploadHero(file, title, description);
            return ResponseEntity.ok(hero);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<HeroSection>> getAllHeroes() {
        return ResponseEntity.ok(heroSectionService.getAllHeroes());
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFile(@PathVariable String fileName) throws MalformedURLException {
        Resource resource = heroSectionService.loadFileAsResource(fileName);
        String contentType;
        try {
            contentType = Files.probeContentType(resource.getFile().toPath());
        } catch (IOException e) {
            contentType = "application/octet-stream";
        }

        boolean displayInline = contentType.startsWith("image/") || contentType.startsWith("video/") || contentType.equals("application/pdf");

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        (displayInline ? "inline" : "attachment") + "; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateHero(
            @PathVariable int id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description) throws IOException {
        HeroSection updated = heroSectionService.updateHero(id, file, title, description);
        return ResponseEntity.ok(updated); //
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteHero(@PathVariable int id) {
        heroSectionService.deleteHero(id);
        return ResponseEntity.noContent().build();
    }
}


Above codes are full java sprinboot REST Apis now we are going to focus on the front end only please.



I only need you to read it and take its design concept please, remember the uploaded image is also exactly same things that I want to build.

2.	This is how you are going to design the front end and integrate it with the API I just gave you.
3.	 After you design the exact front end with the same nav bar design like  the design given to you. For the hero section use the model and the controller and design a hero section when I update the hero section with the title and description and than insert either a image or video display them on the landing page and make sure that you animate the texts and if I uploaded more that 2  hero section make sure to make a slider, whether I upload image or video make sure they are well fitted in the landing page or hero section and well designed and must look very neat and beautiful make sure when they are sliding they must be animation also please.
4.	In Nav bar when I click projects take me to projects page and inside project page please display the content coming from admin panel also, design is well and make it look very clean and modern and very stylish, each time I post a new project make sure to have a counter widget that counts how many projects completed, or in progress or anything else. 
The project page must be well designed and they must be listed in grid cards and each card will have the image or the video with the project details well designed and style please, and each time you post new project it must added to there at that page and must be well response please, and the counter must also count the added project.
5.	When I click news take me to news page display tittle and description of the news and the date posted and the image or video also, make sure the news page also is well designed and very clean please, remember its also posted from the admin.
6.	Services page: on this page please list all services for me that you think can suit this project , they must be in cards with images and descriptions and titles
7.	About Us page: on this page description who we are, our team etc, for the Our team, please design a section where you list our team each one must have a image, name and position.
8.	On home page, must contain all things from all page but all summarized, and have a section for partners and have logos of different companies scrolling 
9.	Create a Admin page and use the user model when login, crate a login page and I must access the login page with /admin example newgate.com.na/admin
On the admin page do the following
a)	I must post the projects, update projects and, delete the projects 
b)	I must update the status of the project using the status controllers
c)	I must post news blogs, update news, delete news too
On the admin page for login only login is needed no creating of profiles please. 
d)	Make the admin panel look very smart, clean and very beautiful also


Now based on the sprinboot I gave you, the colors, and the design I want from both uploaded images and the html file given design for me a well structure and clean,and very responsive website and it must look very beautiful please, use the colors given and please use the logo given too in the nav bar please and it must look exactly like that. And for the hero section, newsblog, projects page  remember everything is coming the admin panel

When you design this make sure the  hero section, newsblog, projects page is empty because I am going to post that from the admin panel, just make sure you implement the design for the them like mentioned, when posting this content please.

I only need a fully frontend designed and well implement and integrated with the controllers given please. 






