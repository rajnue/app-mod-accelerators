package v1

import (
	"context"
	"reflect"
	"testing"

	v1 "github.com/Neudesic/NeuService/pkg/api/neuservice/v1"
)

func Test_neuServiceServer_GetHelloText(t *testing.T) {
	type args struct {
		ctx     context.Context
		request *v1.NeuRequest
	}
	tests := []struct {
		name    string
		s       *neuServiceServer
		args    args
		want    *v1.NeuResponse
		wantErr bool
	}{
		{
			"Empty inputText returns an error",
			&neuServiceServer{},
			args{
				context.Background(),
				&v1.NeuRequest{
					InputText: "",
				},
			},
			nil,
			true,
		},
		{
			"AppModernization returns Hello AppMod",
			&neuServiceServer{},
			args{
				context.Background(),
				&v1.NeuRequest{
					InputText: "AppModernization",
				},
			},
			&v1.NeuResponse{
				ReponseText: "Hello AppModernization",
			},
			false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := tt.s.GetHelloText(tt.args.ctx, tt.args.request)
			if (err != nil) != tt.wantErr {
				t.Errorf("neuServiceServer.GetHelloText() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("neuServiceServer.GetHelloText() = %v, want %v", got, tt.want)
			}
		})
	}
}
