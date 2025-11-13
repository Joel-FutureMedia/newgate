The following is how you will do it

1. https://api.simplyfound.com.na/api/projects/upload
When you post a project in the form only use 
fields on the request parameter 

1. File(I must select a file to upload, video or image)
2. projectName
3. projectDescription
4, clientName
5. projectType
6. projectAddress
7. startDate
8. completionDate
9. Status (Select from the drop down menu, and use the status api to get the status by its Id)

make sure that in the form for posting new project you have those fields and for status make sure to use the status controller


and this will be the response json format
{
    "id": 2,
    "projectName": "james",
    "projectDescription": "Office",
    "clientName": "Office",
    "projectType": "Office",
    "projectAddress": "Office",
    "startDate": "2025-01-15T08:00:00",
    "fileUrl": "https://api.simplyfound.com.na/api/projects/view/imageone_1761657433477 (2)_1761822365148.png",
    "fileType": "image/png",
    "status": {
        "id": 1,
        "statusname": "In Progress"
    },
    "completionDate": "2025-12-20T17:00:00"
}



and under projects page, make sure to design and display this project that was posted, remember to read the .md files to see how the projects page will be design and what style. always use the fileurl to display the project, even if its video design and implement a nice widgets to display each and every projects with its own details. 

and use the rest of the API to get all project, to siaplay all projects on the website, etc, to get all projects on the admin panel, to delete, and update projects,  you have all the files now and please fix this.

The rest of APis and their Response json
https://api.simplyfound.com.na/api/projects/all
json response 
[
    {
        "id": 1,
        "projectName": "OFFICE SCHOOL22",
        "projectDescription": "Building",
        "clientName": "DEBMARINE",
        "projectType": "Office",
        "projectAddress": "Windhoek",
        "startDate": "2025-10-28T09:00:00",
        "fileUrl": "https://api.simplyfound.com.na/api/projects/view/imageone_1761660101205.png",
        "fileType": "image/png",
        "status": {
            "id": 1,
            "statusname": "In Progress"
        },
        "completionDate": "2025-11-05T17:30:00"
    },
    {
        "id": 2,
        "projectName": "james",
        "projectDescription": "Office",
        "clientName": "Office",
        "projectType": "Office",
        "projectAddress": "Office",
        "startDate": "2025-01-15T08:00:00",
        "fileUrl": "https://api.simplyfound.com.na/api/projects/view/imageone_1761657433477 (2)_1761822365148.png",
        "fileType": "image/png",
        "status": {
            "id": 1,
            "statusname": "In Progress"
        },
        "completionDate": "2025-12-20T17:00:00"
    }
]

get by Id
https://api.simplyfound.com.na/api/projects/1
{
    "id": 1,
    "projectName": "OFFICE SCHOOL22",
    "projectDescription": "Building",
    "clientName": "DEBMARINE",
    "projectType": "Office",
    "projectAddress": "Windhoek",
    "startDate": "2025-10-28T09:00:00",
    "fileUrl": "https://api.simplyfound.com.na/api/projects/view/imageone_1761660101205.png",
    "fileType": "image/png",
    "status": {
        "id": 1,
        "statusname": "In Progress"
    },
    "completionDate": "2025-11-05T17:30:00"
}

and the rest is here 
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

Make sure that I can edit projects, or delete projects on the admin panel

and on the website make sure to list and display the posted project there please, grid view, even if the content is video, now design the admin form to post new project and also on the project page design its layout how it will be displayed please.

2. For admin to post news here what to 
https://api.simplyfound.com.na/api/news/upload
fields on the request parameter 
1. file(I must select a file video or image to upload)
2. title
3. description

now this is the jso response
{
    "id": 3,
    "title": "james",
    "description": "Office",
    "fileUrl": "https://api.simplyfound.com.na/api/news/view/next_1761824120810.png",
    "fileType": "image/png",
    "createdDate": "2025-10-30T11:35:20.810931699"
}

also make use of the file url to display the content on the main website under the news blog, make sure you read the .md file to understand its design and layout, but please design  a page for it, when admin post news it must be displayed on the website with its details also, make sure they are displayed in a styled way please.

here is the rest of the endpoints 
to get all news 
https://api.simplyfound.com.na/api/news/all
json response
[
    {
        "id": 1,
        "title": "title",
        "description": "Building",
        "fileUrl": "https://api.simplyfound.com.na/api/news/view/imageone_1761660495653.png",
        "fileType": "image/png",
        "createdDate": "2025-10-28T14:08:15.657611"
    },
    {
        "id": 2,
        "title": "title",
        "description": "Building",
        "fileUrl": "https://api.simplyfound.com.na/api/news/view/imageone_1761657433477 (3)_1761728649936.png",
        "fileType": "image/png",
        "createdDate": "2025-10-29T09:04:09.940463"
    },
    {
        "id": 3,
        "title": "james",
        "description": "Office",
        "fileUrl": "https://api.simplyfound.com.na/api/news/view/next_1761824120810.png",
        "fileType": "image/png",
        "createdDate": "2025-10-30T11:35:20.810932"
    }
]

to get by ID
https://api.simplyfound.com.na/api/news/1

{
    "id": 1,
    "title": "title",
    "description": "Building",
    "fileUrl": "https://api.simplyfound.com.na/api/news/view/imageone_1761660495653.png",
    "fileType": "image/png",
    "createdDate": "2025-10-28T14:08:15.657611"
}

now make sure on the main website you display all the news and on admin panel you can be able to edit or delete them also


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


3. Hero section
Fields on request parameter to post 
https://api.simplyfound.com.na/api/hero/upload
1. file (i must also select a file (video or image to upload))
2. title
3. description

Here is its response also
{
    "id": 1,
    "tittle": "james",
    "description": "Office",
    "fileUrl": "https://api.simplyfound.com.na/api/hero/view/imageone_1761824550971.png",
    "fileType": "image/png"
} 

make sure that when admin post here section it must go under the hero section display the content well using the fileurl please, and if there are more than 2 or 3 hero section than they must slide, each hero section must have its own animated texts and the video or image please and remove this Welcome to Newgate Investments
Building Dreams, Creating Value

Explore Projects and use the real hero section coming from the admin panel

below is the rest of the endpoints
getting all
https://api.simplyfound.com.na/api/hero/all

response 
[
    {
        "id": 1,
        "tittle": "james",
        "description": "Office",
        "fileUrl": "https://api.simplyfound.com.na/api/hero/view/imageone_1761824550971.png",
        "fileType": "image/png"
    }
]

and I admin must be able to update and delete a hero section
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

make sure for the sliders there is proper animations please

4. This is the status file 
package com.example.simplyfoundapis.controllers;

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
 make sure when you update or post status you must also select status

now please go though this and fix the code please, no bugs 
