package upload

import (
	"fmt"
	"mime/multipart"
	"github.com/h2non/filetype"
)

func ValidateBinaryFile(fileHeader *multipart.FileHeader) error {
	file, err := fileHeader.Open()
	if err != nil {
		return fmt.Errorf("unable to open file: %v", err)
	}
	defer file.Close()

	head := make([]byte, 16) 
	_, err = file.Read(head)
	if err != nil {
		return fmt.Errorf("unable to read file: %v", err)
	}

	kind, err := filetype.Match(head)
	if err != nil {
		return fmt.Errorf("unable to determine file type: %v", err)
	}


	if kind == filetype.Unknown {
		return fmt.Errorf("invalid file type: unknown")
	}



	if kind == filetype.Unknown || (kind.MIME.Value != "application/vnd.microsoft.portable-executable" && kind.MIME.Value != "application/octet-stream") {
		return fmt.Errorf("invalid file type: %s", kind.MIME.Value)
	}
	return nil
}
