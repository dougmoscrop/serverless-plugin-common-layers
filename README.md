# serverless-plugin-common-layers

Very simple plugin. Add to your serverless.yml:

```yml
provider:
  name: aws
  runtime: provided
  region: us-east-1
  layers:
    - {{arn}}
```

This layer will be added to every function. It will combine with layers for each function by adding them before. You can also use object configuration:

```yml
provider:
  name: aws
  runtime: provided
  region: us-east-1
  layers:
    before:
        - {{layer}
    after: 
        - {{some other layer}}
```