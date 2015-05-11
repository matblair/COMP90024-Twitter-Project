class TopicsController < ApplicationController
  include DemographicParser
  include TopicRepresentor

  # Supported Topics and levels
  SUPPORTED_TOPICS = ['guncontrol','immigration','unemployment']
  GRANULARITY_LEVELS = ['daily','weekly','monthly','yearly']

  # Before all find the topic params
  before_action :find_topic
  # Find the demographic if it exists
  before_action :find_demo, only: [:show,:trend]
  # Validate params
  before_action :validate_date
  before_action :validate_trend_params,    only: [:trend]

  def show
    # Get couch request
    couch_response = '@date_range'
    # Render json
    render json: show_json(couch_response)
  end

  def trend
    # Get couch request
    couch_response = '@date_range'
    # Render json
    render json: trend_json(couch_response)

  end

  def extremes
    # Get couch request
    couch_response = '@date_range'
    # Render json
    render json: extremes_json(couch_response)
  end

  private

  # Find the topic we are referring to
  def find_topic
    @topic = params[:topic]
    if not (SUPPORTED_TOPICS.include? @topic)
      render json: {:error => "#{@topic} is not a supported topic."}, status: :unprocessable_entity
    end
  end

  # Find demographic information included
  def find_demo
    @demographic = extract_demographic params
  end

  #Validate all the params
  def validate_date
    params.require(:date_range)
    @date_range = params[:date_range]
    # if not(@date_range.has_key?('start_date') &&  @date_range.has_key?('end_date'))
    #   render json: {:error => "Must include start and end date."}, status: :unprocessable_entity
    # end
  end

  def validate_trend_params
    params.require(:granularity)
    @granularity = params['granularity']
    if not (GRANULARITY_LEVELS.include?(@granularity))
      render json: {:error => "#{@granularity} is not a valid granularity level."},
        status: :unprocessable_entity
    end
  end

end
