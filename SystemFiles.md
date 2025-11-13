Fix this error Access to XMLHttpRequest at 'https://api.simplyfound.com.na/api/hero-images' from origin 'http://localhost:8080' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
api.ts:90  GET https://api.simplyfound.com.na/api/hero-images net::ERR_FAILED

for both Hero section, projects and news please.

see models and controllers below and use those controllers please

1. Models
a) 

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

b) 
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

c) 
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

d) package com.example.simplyfoundapis.models;

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



2. Services 
a) 
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


b) package com.example.simplyfoundapis.services;

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

c) package com.example.simplyfoundapis.services;

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

d) package com.example.simplyfoundapis.services;

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


3. Controllers
a) package com.example.simplyfoundapis.controllers;

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
@CrossOrigin(origins = {"https://simplyfound.vercel.app", "http://localhost:8080"},
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

b) package com.example.simplyfoundapis.controllers;

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
@CrossOrigin(origins = {"https://simplyfound.vercel.app", "http://localhost:8080"},
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


c) package com.example.simplyfoundapis.controllers;

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
@CrossOrigin(origins = {"https://simplyfound.vercel.app", "http://localhost:8080"},
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

d) package com.example.simplyfoundapis.controllers;

import com.example.simplyfoundapis.models.Status;
import com.example.simplyfoundapis.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/status")
@CrossOrigin(origins = {"https://ijg-research-admin.vercel.app", "http://localhost:8080"},
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
        exposedHeaders = {"Content-Disposition", "Content-Type"},
        allowCredentials = "true")
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




