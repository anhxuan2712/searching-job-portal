package stu.recruitmentweb.jobportal.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import stu.recruitmentweb.jobportal.domain.payload.response.MessageResponse;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestControllerAdvice
public class MultipartUploadException {

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public BadRequestException handlerFileUpload(MaxUploadSizeExceededException exception, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse){
        throw new  BadRequestException("Dung lượng của file quá 1MB. Mong người dùng kiểm tra lại");
    }
}
